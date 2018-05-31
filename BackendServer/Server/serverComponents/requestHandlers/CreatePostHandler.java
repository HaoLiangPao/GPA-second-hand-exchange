package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class CreatePostHandler implements HttpHandler{

	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// Assumed query tokens (Has to be in this particular order)
		final String ordered_qry_tokens[] = {Configuration.COL_POST_POST_ID, Configuration.COL_POST_OWNER_ID,
				Configuration.COL_POST_BOOK_TITLE, Configuration.COL_POST_BOOK_PHOTO, Configuration.COL_POST_COURSE_ID,
				Configuration.COL_POST_INSTRUCTOR, Configuration.COL_POST_TAKE_YEAR, Configuration.COL_POST_DESCRIPTION,
				Configuration.COL_POST_PRICE, Configuration.COL_POST_STATUS};
		Util.oneQueryHandler(arg0, ordered_qry_tokens, Configuration.QRY_CREAT_POST);
	}

}
