package serverComponents.requestHandlers;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;

import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObjectBuilder;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Server;

public class Util {

	/**
	 * Most basic handler function.
	 * 
	 * Work flow:
	 * 
	 * Get HTTP URL query in the given HTTP Request in "arg0"
	 * ->
	 * Parse information provided by this query based on the given list of tokens "ordered_qry_tokens"
	 * ->
	 * Apply the parsed parameters to the given PreparedStatement template "ps_template"
	 * ->
	 * Execute that PreparedStatement and put information in the retained ResultSet into the HTTP Response in "arg0"
	 * 
	 * @param arg0
	 * @param ordered_qry_tokens
	 * @param ps_template
	 * @throws IOException
	 */
	protected static Map<String, String> oneQueryHandler(HttpExchange arg0, String[] ordered_qry_tokens, String ps_template) throws IOException{
		System.out.println("Incoming request...");
		final StringBuilder response = new StringBuilder();
		// Assumed query tokens (Has to be in this particular order)
        final Map<String, String> parameters = new HashMap<String, String>();
        Util.initParamMap(ordered_qry_tokens, parameters);
        try {
			Util.parseQuery(arg0.getRequestURI().getRawQuery(), parameters);
		} catch (Exception e) {
			Util.doParseQueryError(e, response, arg0);
			return null;
		}
		// Generate sql queries
        Connection pooledConn = null;
        PreparedStatement ps = null;
        try {
			pooledConn = Server.pooledDS.getConnection();
			ps = pooledConn.prepareStatement(ps_template);
			Util.setPsParams(ordered_qry_tokens, ps, parameters);
		} catch (SQLException e) {
			Util.doSQLError(e, response, arg0);
			Util.returnStatementToPool(ps);
			Util.returnConnectionToPool(pooledConn);
			return null;
		}
        // Execute generated queries against the mysql database
        // Collecting query results and write into response
        ResultSet rs;
        try {
			ps.execute();
			rs = ps.getResultSet();
			if( !Util.writeRsIntoStringBuilderAsJSON(rs, response) ){
				System.out.println("YES");
				arg0.getResponseHeaders().add("status", "1");
			}
			else{
				arg0.getResponseHeaders().add("status", "0");
			}
			Util.doSuccessResponse(response, arg0);
			return parameters;
		} catch (Exception e) {
			Util.doSQLError(e, response, arg0);
			return null;
		} finally {
			Util.returnStatementToPool(ps);
			Util.returnConnectionToPool(pooledConn);
        }
	}
	
	
	/**
	 * Parse given query and put all key-value pairs into the given empty parameter Map.
	 * 
	 * Throw exception if any error occurs in decoding or any key parsed cannot be found in the given Map.
	 * 
	 * @param query -- Assumed format: key1=val1&key2=val2&...
	 * @param parameters -- Assumed format: (String) expected_key -> null
	 * @throws Exception
	 */
	protected static void parseQuery(String query, Map<String, String> parameters) throws Exception {
		if (query != null) {
			// Get all key-value pairs
			final String pairs[] = query.split("[&]");
			String param[] = null;
			String this_key = null;
			String this_value = null;
			for (String this_pair : pairs) {
				// Parse key and value then update the parameter set
				param = this_pair.split("[=]");
				this_key = null;
				this_value = null;
				if (param.length > 0) {
					this_key = URLDecoder.decode(param[0], "UTF-8"); // Expected content-type is "application/x-www-form-urlencoded"
																	 // From https://docs.oracle.com/javase/7/docs/api/java/net/URLDecoder.html, UTF-8 should be used as the encoding scheme
				}
				if (param.length > 1) {
					this_value = URLDecoder.decode(param[1], "UTF-8"); // Expected content-type is "application/x-www-form-urlencoded"
				}													   // From https://docs.oracle.com/javase/7/docs/api/java/net/URLDecoder.html, UTF-8 should be used as the encoding scheme
				System.out.println("This key-value pair: " + this_key + "-" + this_value);
				if (parameters.containsKey(this_key)) {
					parameters.put(this_key, this_value.equals("@") ? "" : this_value); // Use '@' to represent empty string in URL, otherwise: empty string value = no value = NULL value here
				} else {
					throw new Exception(String.format("Unexpected key [%s] in URL query: %s", this_key, query));
				}
			}
		}
	}
	
	/**
	 * Set the parameters for the given PreparedStatement with given ordered array of tokens
	 * 
	 * @param ordered_qry_tokens
	 * @param ps
	 * @param parameters
	 * @throws SQLException
	 */
	protected static void setPsParams(String[] ordered_qry_tokens, PreparedStatement ps, Map<String, String> parameters) throws SQLException{
    	int i;
    	for ( i = 0; i < ordered_qry_tokens.length; i++ ){
    		String value = parameters.get(ordered_qry_tokens[i]);
    		if ( null == value ) {
    			ps.setNull(i+1, Types.VARCHAR);
    		}
    		else if ( ordered_qry_tokens[i].equals("N") ) { // Special case: parameter 'N' specified by SearchNextN requests
    			ps.setInt(i+1, Integer.parseInt(parameters.get(ordered_qry_tokens[i])));
    		}
    		else {
        		ps.setString(i+1, parameters.get(ordered_qry_tokens[i]));
    		}
    	}
	}
	
	/**
	 * Initialize the parameter map with given ordered array of tokens
	 * 
	 * Format: (String) token -> null
	 * 
	 * @param ordered_qry_tokens
	 * @param params_map
	 */
	protected static void initParamMap(String[] ordered_qry_tokens, Map<String, String> params_map ){
    	int i;
    	for ( i = 0; i < ordered_qry_tokens.length; i++ ){
    		params_map.put(ordered_qry_tokens[i], null);
    	}
	}
	
	
	/**
	 * String format:
	 * 
	 * [
	 * {colName1: row1col1, colName2: row1col2, colName3: row1col3 ... }, -- JSON1
	 * {colName1: row2col1, colName2: row2col2, colName3: row2col3 ... }, -- JSON2
	 * ...
	 * ]
	 * 
	 * @param rs
	 * @param sb
	 * @return boolean -- false if empty result; else true
	 * @throws SQLException 
	 */
	protected static boolean writeRsIntoStringBuilderAsJSON(ResultSet rs, StringBuilder sb) throws Exception{
		try{
			if( rs != null ){
				ResultSetMetaData rsmd = rs.getMetaData();
				int num_cols = rsmd.getColumnCount();
				
				JsonArray json_arr;
				JsonArrayBuilder json_arr_builder = Json.createArrayBuilder();
				
				int num_rows = 0;
				while ( rs.next() ){
					JsonObjectBuilder json_builder = Json.createObjectBuilder();
					
					for ( int i = 1; i <= num_cols; i++ ){
						String property_name = rsmd.getColumnName(i);
						json_builder.add(property_name, rs.getString(i));
					}
					
					json_arr_builder.add(json_builder);
					num_rows++;
				}
				
				json_arr = json_arr_builder.build();
				sb.append(json_arr);
				return num_rows != 0;
			}
		} finally {
			if( rs != null ){
				rs.close();
			}
		}
		return false;
	}
	
	/**
	 * String format:
	 * 
	 * col1Name,col2Name,col3Name,col4Name......
	 * row1col1,row1col2,row1col3,row1col4......
	 * row2col1,row2col2,row2col3,row2col4......
	 * ...... (No spaces, one row per line)
	 * 
	 * @param rs
	 * @param sb
	 * @throws SQLException 
	 */
	@Deprecated
	protected static void writeRsIntoStringBuilder(ResultSet rs, StringBuilder sb) throws Exception{
		try{
			if( rs != null ){
				ResultSetMetaData rsmd = rs.getMetaData();
				int num_cols = rsmd.getColumnCount();
				// Print column names
				int j;
				for ( j = 1; j <= num_cols; j++ ){
					sb.append(rsmd.getColumnName(j));
					if ( j != num_cols ){
						sb.append(",");
					}
					else{
						sb.append("\n");
					}
				}
				
				// Print rows
				int i;
				while ( rs.next() ){
					for ( i = 1; i <= num_cols; i++ ){
						sb.append(rs.getString(i));
						if ( i != num_cols ){
							sb.append(",");
						}
						else{
							sb.append("\n");
						}
					}
				}
			}
		} finally {
			if( rs != null ){
				rs.close();
			}
		}
	}
	
	protected static void returnConnectionToPool(Connection conn){
		if ( conn != null ){
			try {
				conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	protected static void returnStatementToPool(PreparedStatement ps){
		if ( ps != null ){
			try {
				ps.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * Helper function to deal with success response
	 * 
	 * @param response
	 * @param arg0
	 * @throws IOException
	 */
	protected static void doSuccessResponse(StringBuilder response, HttpExchange arg0) throws IOException{
		OutputStream os = arg0.getResponseBody();
		byte[] response_in_bytes = response.toString().getBytes();
		arg0.sendResponseHeaders(200, response_in_bytes.length);
		os.write(response_in_bytes);
		os.close();
	}

	protected static void doParseQueryError(Exception e, StringBuilder response, HttpExchange arg0)  throws IOException {
		final String msg = "Error occured when parsing query!";
		doError(e, response, arg0, msg);
	}
	
	protected static void doSQLError(Exception e, StringBuilder response, HttpExchange arg0) throws IOException {
		final String msg = "Error occured when talking to database!";
		doError(e, response, arg0, msg);
	}
	
	/**
	 * Helper function to deal with exceptions in handlers
	 * 
	 * print ST + write response with given msg and the exception msg + close response stream
	 * 
	 * @param e
	 * @param response
	 * @param arg0
	 * @param msg
	 * @throws IOException
	 */
	protected static void doError(Exception e, StringBuilder response, HttpExchange arg0, String msg) throws IOException{
		OutputStream os = arg0.getResponseBody();
		response.append(msg + "\n");
		String err_msg = e.getMessage();
		response.append("Error message: " + err_msg);
		System.out.println("Exception: " + err_msg);
		e.printStackTrace();
		byte[] response_in_bytes = response.toString().getBytes();
		arg0.sendResponseHeaders(500, response_in_bytes.length);
		os.write(response_in_bytes);
		os.close();
	}
}
