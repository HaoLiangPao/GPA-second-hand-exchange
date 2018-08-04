package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Configuration;

public class SearchUserAllHandler extends SearchHandler {
	
	/*
	 * Example URL: http://localhost:8000/search/display/user?OwnerID=?
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		this.ordered_qry_tokens = new String[] {Configuration.COL_POST_OWNER_ID};
		this.qry_template = Configuration.QRY_GET_USER_POST_DISPLAY_INFO_ORDER_BY_DATE;
		super.handle(arg0);
	}
}
