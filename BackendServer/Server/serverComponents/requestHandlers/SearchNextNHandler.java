package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Configuration;

public class SearchNextNHandler extends SearchHandler {
	
	/*
	 * Example URL: http://localhost:8000/search/display/nextN?OwnerID=val1&BookTitle=val2&CreateDate=val3&N=10
	 * 
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		this.ordered_qry_tokens = new String[] {Configuration.COL_POST_OWNER_ID, Configuration.COL_POST_BOOK_TITLE, Configuration.COL_POST_CREATE_DATE, "N"};
		this.qry_template = Configuration.QRY_GET_NEXT_N_POST_DISPLAY_INFO_ORDER_BY_DATE;
		super.handle(arg0);
	}
}
