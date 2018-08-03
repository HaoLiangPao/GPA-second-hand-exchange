package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Configuration;

public class SearchAllInfoByBookID extends SearchHandler {
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		this.ordered_qry_tokens = new String[] {Configuration.COL_POST_POST_ID};
		this.qry_template = Configuration.QRY_GET_ALL_POST_INFO_BY_POST_ID;
		super.handle(arg0);
	}
}
