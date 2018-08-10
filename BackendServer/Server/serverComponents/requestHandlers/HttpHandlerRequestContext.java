package serverComponents.requestHandlers;

import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.fileupload.RequestContext;

import com.sun.net.httpserver.HttpExchange;

/*
 * StackOverFlow reference link --
 * https://stackoverflow.com/questions/33732110/file-upload-using-httphandler 
 */

public class HttpHandlerRequestContext implements RequestContext {

	private HttpExchange httpExchange;

	public HttpHandlerRequestContext(HttpExchange httpExchange) {
		this.httpExchange = httpExchange;
	}

	@Override
	public String getCharacterEncoding() {
    	return "UTF-8"; 
	}

	@Override
	public int getContentLength() {
		// Tested to work with 0 as return. Deprecated anyways
		return 0; 
	}

	@Override
	public String getContentType() {
		// Content-Type includes the boundary needed for parsing
		return httpExchange.getRequestHeaders().getFirst("Content-type");
	}

	@Override
	public InputStream getInputStream() throws IOException {
		// Pass on input stream
		return httpExchange.getRequestBody();
	}
}