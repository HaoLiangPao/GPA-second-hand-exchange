package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;


public abstract class SearchHandler implements HttpHandler{
	
	protected String ordered_qry_tokens[];
	protected String qry_template;

	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// TODO Auto-generated method stub
		Util.oneQueryHandler(arg0, ordered_qry_tokens, qry_template);
	}

}
