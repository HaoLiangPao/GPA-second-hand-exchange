package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class GetUserInfoHandler implements HttpHandler{

	/*
	 * Example URL: http://localhost:8000/user/getInfo?UserID=val1
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// Assumed query tokens (Has to be in this particular order)
		final String ordered_qry_tokens[] = {Configuration.COL_USER_USER_ID};
		Util.oneQueryHandler(arg0, ordered_qry_tokens, Configuration.QRY_GET_USER_INFO_BY_USER_ID);
	}

}
