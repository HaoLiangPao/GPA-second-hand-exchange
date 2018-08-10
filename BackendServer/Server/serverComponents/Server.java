package serverComponents;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import javax.sql.DataSource;
import com.sun.net.httpserver.HttpServer;
import com.mchange.v2.c3p0.*;

import serverComponents.requestHandlers.*;
import serverComponents.Configuration;

public class Server {
	
	public static DataSource pooledDS = null;
	
	@SuppressWarnings("unchecked")
	public static void main(String args[]) throws IOException, SQLException{
		
		// Set up the HTTP server
		
		final HttpServer server = HttpServer.create(new InetSocketAddress(Configuration.PORT), 0);
		
		// Routing
		server.createContext("/user/create", new CreateUserAccountHandler());
		server.createContext("/user/getInfo", new GetUserInfoHandler());
		server.createContext("/user/update", new UpdateUserInfoHandler());
		server.createContext("/search/display/all", new SearchAllHandler());
		server.createContext("/search/display/user", new SearchUserAllHandler());
		server.createContext("/search/display/course", new SearchCourseAllHandler());
		server.createContext("/search/display/nextN", new SearchNextNHandler());
		server.createContext("/search/detail", new SearchByBookHandler());
		server.createContext("/post/create", new CreatePostHandler());
		server.createContext("/post/update", new UpdatePostHandler());
		server.createContext("/post/delete", new DeletePostHandler());
		server.createContext(Configuration.IMAGE_UPLOAD_ROUTE, new UploadBookImageHandler());
		server.createContext(Configuration.IMAGE_DOWNLOAD_ROUTE, new DownloadBookImageHandler());
		
		server.setExecutor(null); // Default way of managing threads
		System.out.println("About to start HTTP server at port " + Configuration.PORT);
		server.start();
		System.out.println("Started HTTP server at port " + Configuration.PORT);
		
		// Configure a JDBC Connection pool and set its own configuration 
		// Use c3p0 library, documented here: https://www.mchange.com/projects/c3p0/index.html
		DataSource unpooled = DataSources.unpooledDataSource(String.format(Configuration.MYSQL_JDBC_URL, Configuration.MYSQL_DB), Configuration.MYSQL_USER, Configuration.MYSQL_PWD);
		@SuppressWarnings("rawtypes")
		Map properties = new HashMap();
		properties.put(Configuration.PR_ACQUIRE_INCREMENT , Configuration.ACQUIRE_INCREMENT);
		properties.put(Configuration.PR_INITIAL_POOL_SIZE, Configuration.INITIAL_POOL_SIZE);
		properties.put(Configuration.PR_MAX_POOL_SIZE, Configuration.MAX_POOL_SIZE);
		properties.put(Configuration.PR_MIN_POOL_SIZE, Configuration.MIN_POOL_SIZE);
		properties.put(Configuration.PR_IDLE_CONNECTION_TEST_PERIOD, Configuration.IDLE_CONNECTION_TEST_PERIOD);
		properties.put(Configuration.PR_MAX_STATEMENTS_PER_CONNECTION, Configuration.MAX_STATEMENTS_PER_CONNECTION);
		pooledDS = DataSources.pooledDataSource( unpooled, properties );
		
	}
}
