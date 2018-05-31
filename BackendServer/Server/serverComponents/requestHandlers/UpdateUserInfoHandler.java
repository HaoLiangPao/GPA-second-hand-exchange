package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class UpdateUserInfoHandler implements HttpHandler{

	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// Assumed query tokens (Has to be in this particular order)
		final String ordered_qry_tokens[] = {Configuration.COL_USER_USER_NAME,
				Configuration.COL_USER_USER_PWD, Configuration.COL_USER_WECHAT_INFO, Configuration.COL_USER_PHONE_NUMBER,
				Configuration.COL_USER_EMAIL, Configuration.COL_USER_PROGRAM};
		Util.oneQueryHandler(arg0, ordered_qry_tokens, Configuration.QRY_CREATE_USER);
	}

}
