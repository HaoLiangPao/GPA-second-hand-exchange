package serverComponents.requestHandlers;

import java.io.IOException;

import com.sun.net.httpserver.HttpExchange;

import serverComponents.Configuration;

public class SearchCourseNextNHandler extends SearchHandler {
	
	/*
	 * Example URL: http://localhost:8000/search/display/courseNextN?OwnerID=val1&CreateDate=val3&CourseCode=CSC%&N=10
	 * 
	 */
	
	@Override
	public void handle(HttpExchange arg0) throws IOException {
		this.ordered_qry_tokens = new String[] {Configuration.COL_POST_CREATE_DATE, Configuration.COL_POST_CREATE_DATE, Configuration.COL_POST_OWNER_ID, Configuration.COL_POST_COURSE_CODE, "N"};
		this.qry_template = Configuration.QRY_GET_COURSE_NEXT_N_POST_DISPLAY_INFO_ORDER_BY_DATE;
		super.handle(arg0);
	}
}
