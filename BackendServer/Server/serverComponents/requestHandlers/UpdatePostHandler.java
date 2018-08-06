package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

import serverComponents.Configuration;

public class UpdatePostHandler implements HttpHandler{

	/*
	 * Exmaple URL: http://localhost:8000/post/update?OwnerID=val1&BookTitle=val2&BookPhotoURL=val3&CourseCode=val4&Instructor=val5&TakeYear=val6&Description=val7&Price=val8&CreateDate=val9&HasNotes=val10
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		// Assumed query tokens (Has to be in this particular order)
		final String ordered_qry_tokens[] = {Configuration.COL_POST_OWNER_ID,
				Configuration.COL_POST_BOOK_TITLE, Configuration.COL_POST_BOOK_PHOTO_URL, Configuration.COL_POST_COURSE_CODE,
				Configuration.COL_POST_INSTRUCTOR, Configuration.COL_POST_TAKE_YEAR, Configuration.COL_POST_DESCRIPTION,
				Configuration.COL_POST_PRICE, Configuration.COL_POST_CREATE_DATE, Configuration.COL_POST_HAS_NOTES, Configuration.COL_POST_OWNER_ID, Configuration.COL_POST_BOOK_TITLE};
		Util.oneQueryHandler(arg0, ordered_qry_tokens, Configuration.QRY_UPDATE_POST);
	}

}
