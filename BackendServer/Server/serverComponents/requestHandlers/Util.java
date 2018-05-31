package serverComponents.requestHandlers;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

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
	protected static void oneQueryHandler(HttpExchange arg0, String[] ordered_qry_tokens, String ps_template) throws IOException{
		final StringBuilder response = new StringBuilder();
		OutputStream os = arg0.getResponseBody();
		// Assumed query tokens (Has to be in this particular order)
        final Map<String, String> parameters = new HashMap<String, String>();
        Util.initParamMap(ordered_qry_tokens, parameters);
        try {
			Util.parseQuery(arg0.getRequestURI().getRawQuery(), parameters);
		} catch (Exception e) {
			Util.doParseQueryError(e, response, arg0, os);
			return;
		}
		// Generate sql queries
        Connection pooledConn = null;
        PreparedStatement ps = null;
        try {
			pooledConn = Server.pooledDS.getConnection();
			ps = pooledConn.prepareStatement(ps_template);
			Util.setPsParams(ordered_qry_tokens, ps, parameters);
		} catch (SQLException e) {
			Util.doSQLError(e, response, arg0, os);
			Util.returnConnectionToPool(pooledConn);
			Util.returnStatementToPool(ps);
			return;
		}
        // Execute generated queries against the mysql database
        // Collecting query results and write into response
        ResultSet rs;
        try {
			rs = ps.executeQuery();
			Util.writeRsIntoStringBuilder(rs, response);
			Util.doSuccessResponse(response, arg0, os);
		} catch (SQLException e) {
			Util.doSQLError(e, response, arg0, os);
			return;
		} finally {
			Util.returnConnectionToPool(pooledConn);
			Util.returnStatementToPool(ps);
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
					this_key = URLDecoder.decode(param[0], System.getProperty("file.encoding"));
				}
				if (param.length > 1) {
					this_value = URLDecoder.decode(param[1], System.getProperty("file.encoding"));
				}
				if (parameters.containsKey(this_key)) {
					parameters.put(this_key, this_value);
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
    		ps.setString(i+1, parameters.get(ordered_qry_tokens[i]));
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
	 * row1col1,row2col2,row3col3,row4col4......
	 * row2col1,row2col2,row2col3,row2col4......
	 * ...... (No spaces, one row per line)
	 * 
	 * @param rs
	 * @param sb
	 * @throws SQLException 
	 */
	protected static void writeRsIntoStringBuilder(ResultSet rs, StringBuilder sb) throws SQLException{
		ResultSetMetaData rsmd = rs.getMetaData();
		int num_cols = rsmd.getColumnCount();
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
		rs.close();
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
	 * @param os
	 * @throws IOException
	 */
	protected static void doSuccessResponse(StringBuilder response, HttpExchange arg0, OutputStream os) throws IOException{
		arg0.sendResponseHeaders(200, response.length());
		os.write(response.toString().getBytes());
		os.close();
	}

	protected static void doParseQueryError(Exception e, StringBuilder response, HttpExchange arg0, OutputStream os)  throws IOException {
		final String msg = "Error occured when parsing query!";
		doError(e, response, arg0, os, msg);
	}
	
	protected static void doSQLError(Exception e, StringBuilder response, HttpExchange arg0, OutputStream os) throws IOException {
		final String msg = "Error occured when talking to database!";
		doError(e, response, arg0, os, msg);
	}
	
	/**
	 * Helper function to deal with exceptions in handlers
	 * 
	 * print ST + write response with given msg + close response stream
	 * 
	 * @param e
	 * @param response
	 * @param arg0
	 * @param os
	 * @param msg
	 * @throws IOException
	 */
	private static void doError(Exception e, StringBuilder response, HttpExchange arg0, OutputStream os, String msg) throws IOException{
		e.printStackTrace();
		response.append(msg);
		arg0.sendResponseHeaders(500, response.length());
		os.write(response.toString().getBytes());
		os.close();
	}
}
