package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class UpdateUserInfoHandler implements HttpHandler{

	/*
	 * Example URL: http://localhost:8000/user/update?UserID=val1&FullName=val2&WeChatID=val3&PhoneNumber=val4&Email=val5&Program=val6&Campus=val7&Year=val8&CreateDate=val9&IsGP=val10&QRCodeURL=val11
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// Assumed query tokens (Has to be in this particular order)
		final String ordered_qry_tokens[] = {Configuration.COL_USER_USER_ID, Configuration.COL_USER_USER_NAME,
				Configuration.COL_USER_WECHAT_ID, Configuration.COL_USER_PHONE_NUMBER, Configuration.COL_USER_EMAIL, Configuration.COL_USER_PROGRAM,
				Configuration.COL_USER_CAMPUS, Configuration.COL_USER_YEAR, Configuration.COL_USER_CREATE_DATE, Configuration.COL_USER_IS_GP,
				Configuration.COL_USER_QRCODE_URL, Configuration.COL_USER_USER_ID};
		Util.oneQueryHandler(arg0, ordered_qry_tokens, Configuration.QRY_UPDATE_USER);
	}

}
