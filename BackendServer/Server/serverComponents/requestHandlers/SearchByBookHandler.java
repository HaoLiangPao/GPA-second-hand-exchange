package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Configuration;

public class SearchByBookHandler extends SearchHandler {
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		this.ordered_qry_tokens = new String[] {Configuration.COL_POST_BOOK_TITLE};
		this.qry_template = Configuration.QRY_SEARCH_POST_BY_BOOK_TITLE;
		super.handle(arg0);
	}
}
