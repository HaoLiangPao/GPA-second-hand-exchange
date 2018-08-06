package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Configuration;

public class SearchCourseAllHandler extends SearchHandler {
	
	/*
	 * Example URL: http://localhost:8000/search/display/course?CourseCode=val4
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		this.ordered_qry_tokens = new String[] {Configuration.COL_POST_COURSE_CODE};
		this.qry_template = Configuration.QRY_GET_COURSE_POST_DISPLAY_INFO_ORDER_BY_DATE;
		super.handle(arg0);
	}
}