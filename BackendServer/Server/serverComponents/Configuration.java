package serverComponents;

/**
 * Configuration Parameters
 * 
 * @author ken
 *
 */
public class Configuration {
	
	public static final String DOMAIN_NAME = "localhost:8000";
	
	// Constants for image download/upload API
	public static final String IMAGE_DIR = "/root/imageFolder";
	public static final String IMAGE_UPLOAD_ROUTE = "/bookImage/upload";
	public static final String IMAGE_DOWNLOAD_ROUTE = "/bookImage/download";
	
	// Connection configuration
	public static final int PORT = 8000;
	public static final String MYSQL_JDBC_URL = "jdbc:mysql://localhost:3306/%s?serverTimezone=UTC&useSSL=false";
	public static final String MYSQL_DB = "SHB_db";
	public static final String MYSQL_USER = "root";
	public static final String MYSQL_PWD = "a19970504";
	
	// Connection pool configuration
	
	// Pool size management
	public static final String PR_ACQUIRE_INCREMENT = "acquireIncrement";
	public static final int ACQUIRE_INCREMENT = 1; // Number of connections to acquire when needed
	public static final String PR_INITIAL_POOL_SIZE = "initialPoolSize";
	public static final int INITIAL_POOL_SIZE = 10;
	public static final String PR_MAX_POOL_SIZE = "maxPoolSize";
	public static final int MAX_POOL_SIZE = 20;
	public static final String PR_MIN_POOL_SIZE = "minPoolSize";
	public static final int MIN_POOL_SIZE = 5;
	
	// Connection Testing
	public static final String PR_IDLE_CONNECTION_TEST_PERIOD = "idleConnectionTestPeriod";
	public static final int IDLE_CONNECTION_TEST_PERIOD = 180; // Period of time per which a idle connection will be tested
	
	// Statement pooling
	public static final String PR_MAX_STATEMENTS_PER_CONNECTION = "maxStatementsPerConnection";
	public static final int MAX_STATEMENTS_PER_CONNECTION = 12;
	
	// Database structure: TBL_* are table names; COL_* are column names
	
	//UserID is the openid in wechat program, WeChatID is the wechat name that the user using.
	// CREATE TABLE USER(UserID varchar(30) primary key, FullName varchar(30), WeChatID varchar(30), PhoneNumber varchar(30), Email varchar(30),
	// Program varchar(30), Campus varchar(30), Year varchar(30), CreateDate varchar(30), IsGP varchar(30), QRCodeURL varchar(200))
	public static final String TBL_USER = "USER";
	public static final String COL_USER_USER_ID = "UserID"; // primary key; Should be open ID on WeChat front end side
	public static final String COL_USER_USER_NAME = "FullName";
	public static final String COL_USER_WECHAT_ID = "WeChatID";
	public static final String COL_USER_PHONE_NUMBER = "PhoneNumber";
	public static final String COL_USER_EMAIL = "Email";
	public static final String COL_USER_PROGRAM = "Program";
	public static final String COL_USER_CAMPUS = "Campus";
	public static final String COL_USER_YEAR = "Year";
	public static final String COL_USER_CREATE_DATE = "CreateDate";
	public static final String COL_USER_IS_GP = "IsGP";
	public static final String COL_USER_QRCODE_URL = "QRCodeURL";
	
	 /*CREATE TABLE POST(OwnerID varchar(30), BookTitle varchar(50), BookPhotoURL varchar(2000), CourseCode varchar(30), Instructor varchar(50), TakeYear varchar(30),
	 Description varchar(600), Price varchar(30), CreateDate varchar(30), HasNotes varchar(30), PRIMARY KEY (OwnerID, BookTitle))*/
	public static final String TBL_POST = "POST";
	// (OwnerID, BookTitle) -- primary key
	public static final String COL_POST_OWNER_ID = "OwnerID"; // foreign key references USER.UserID
	public static final String COL_POST_BOOK_TITLE = "BookTitle";
	public static final String COL_POST_BOOK_PHOTO_URL = "BookPhotoURL";
	public static final String COL_POST_COURSE_CODE = "CourseCode";
	public static final String COL_POST_INSTRUCTOR = "Instructor";
	public static final String COL_POST_TAKE_YEAR = "TakeYear";
	public static final String COL_POST_DESCRIPTION = "Description";
	public static final String COL_POST_PRICE = "Price";
	public static final String COL_POST_CREATE_DATE = "CreateDate";
	public static final String COL_POST_HAS_NOTES = "HasNotes";
	
	// PreparedStatements
	public static final String QRY_CREATE_USER = String.format("INSERT INTO %s ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", TBL_USER, COL_USER_USER_ID, COL_USER_USER_NAME,
			COL_USER_WECHAT_ID, COL_USER_PHONE_NUMBER, COL_USER_EMAIL, COL_USER_PROGRAM, COL_USER_CAMPUS, 
			COL_USER_YEAR, COL_USER_CREATE_DATE, COL_USER_IS_GP, COL_USER_QRCODE_URL);
			// INSERT INTO USER (UserID, FullName, WeChatID, PhoneNumber, Email, Program, Campus, Year, CreateDate, IsGP, QRCodeURL) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
	
	public static final String QRY_UPDATE_USER = String.format("UPDATE %s SET %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=? "
			+ "WHERE %s=?", TBL_USER, COL_USER_USER_ID, COL_USER_USER_NAME,
			COL_USER_WECHAT_ID, COL_USER_PHONE_NUMBER, COL_USER_EMAIL, COL_USER_PROGRAM, COL_USER_CAMPUS, 
			COL_USER_YEAR, COL_USER_CREATE_DATE, COL_USER_IS_GP, COL_USER_QRCODE_URL, COL_USER_USER_ID);
			// UPDATE USER SET UserID=?, FullName=?, WeChatID=?, PhoneNumber=?, Email=?, Program=?, Campus=?, Year=?, CreateDate=?, IsGP=?, QRCodeURL=? WHERE UserID=?
	
	public static final String QRY_CREAT_POST = String.format("INSERT INTO %s ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s )"
			+ "VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )", TBL_POST, COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL,
			COL_POST_COURSE_CODE, COL_POST_INSTRUCTOR, COL_POST_TAKE_YEAR, COL_POST_DESCRIPTION, COL_POST_PRICE, COL_POST_CREATE_DATE, COL_POST_HAS_NOTES);
			// INSERT INTO POST ( OwnerID, BookTitle, BookPhotoURL, CourseCode, Instructor, TakeYear, Description, Price, CreateDate, HasNotes ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )
	
	public static final String QRY_UPDATE_POST = String.format("UPDATE %s SET %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?, %s=?"
			+ "WHERE %s=? and %s=?", TBL_POST, COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL,
			COL_POST_COURSE_CODE, COL_POST_INSTRUCTOR, COL_POST_TAKE_YEAR, COL_POST_DESCRIPTION, COL_POST_PRICE, COL_POST_CREATE_DATE, COL_POST_HAS_NOTES, COL_POST_OWNER_ID, COL_POST_BOOK_TITLE);
			// UPDATE POST SET OnwerID=?, BookTitle=?, BookPhotoURL=?, CourseCode=?, Instructor=?, TakeYear=?, Description=?, Price=?, CreateDate=?, HasNotes=?
	
	public static final String QRY_DELETE_POST = String.format("DELETE FROM %s WHERE %s=? and %s=?", TBL_POST, COL_POST_OWNER_ID, COL_POST_BOOK_TITLE);
			// DELETE FROM POST WHERE OwnerID=? and BookTitle=?
	
	public static final String QRY_GET_USER_INFO_BY_USER_ID = String.format("SELECT %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s FROM %s WHERE %s=?",
			COL_USER_USER_ID, COL_USER_USER_NAME, COL_USER_WECHAT_ID, COL_USER_PHONE_NUMBER, COL_USER_EMAIL, COL_USER_PROGRAM, COL_USER_CAMPUS, 
			COL_USER_YEAR, COL_USER_CREATE_DATE, COL_USER_IS_GP, COL_USER_QRCODE_URL, TBL_USER, COL_USER_USER_ID);
			// SELECT UserID, FullName, WeChatID, PhoneNumber, Email, Program, Campus, Year, CreateDate, IsGP, QPCodeURL FROM USER WHERE UserID=?
	
	public static final String QRY_GET_POST_BY_PRIMARY_KEY = String.format("SELECT %s, %s, %s, %s, %s, %s, %s, %s, %s, %s FROM %s WHERE %s=? and %s=?",
			COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL,
			COL_POST_COURSE_CODE, COL_POST_INSTRUCTOR, COL_POST_TAKE_YEAR, COL_POST_DESCRIPTION, COL_POST_PRICE, COL_POST_CREATE_DATE, COL_POST_HAS_NOTES,
			TBL_POST, COL_POST_OWNER_ID, COL_POST_BOOK_TITLE);
			// SELECT OwnerID, BookTitle, BookPhotoURL, CourseCode, Instructor, TakeYear, Description, Price, CreateDate, HasNotes FROM POST WHERE OwnerID=? and BookTitle=?
	
	public static final String QRY_GET_ALL_POST_DISPLAY_INFO_ORDER_BY_DATE = String.format("SELECT %s, %s, %s, %s, %s, %s FROM %s ORDER BY %s DESC", COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL, COL_POST_COURSE_CODE, COL_POST_PRICE, COL_POST_CREATE_DATE, TBL_POST, COL_POST_CREATE_DATE);
			// SELECT OwnerID, BookTitle, BookPhotoURL, CourseCode, Price, CreateDate FROM POST ORDER BY CreateDate
	
	public static final String QRY_GET_USER_POST_DISPLAY_INFO_ORDER_BY_DATE = String.format("SELECT %s, %s, %s, %s, %s, %s FROM %s WHERE %s=? ORDER BY %s DESC", COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL, COL_POST_COURSE_CODE, COL_POST_PRICE, COL_POST_CREATE_DATE, TBL_POST, COL_POST_OWNER_ID, COL_POST_CREATE_DATE);
	// SELECT OwnerID, BookTitle, BookPhotoURL, CourseCode, Price, CreateDate FROM POST WHERE OwnerID=? ORDER BY CreateDate 
	
	public static final String QRY_GET_COURSE_POST_DISPLAY_INFO_ORDER_BY_DATE = String.format("SELECT %s, %s, %s, %s, %s, %s FROM %s WHERE %s like ? ORDER BY %s DESC", COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL, COL_POST_COURSE_CODE, COL_POST_PRICE, COL_POST_CREATE_DATE, TBL_POST, COL_POST_COURSE_CODE, COL_POST_CREATE_DATE);
	// SELECT OwnerID, BookTitle, BookPhotoURL, CourseCode, Price, CreateDate FROM POST WHERE CourseCode LIKE ? ORDER BY CreateDate 
	
	public static final String QRY_GET_NEXT_N_POST_DISPLAY_INFO_ORDER_BY_DATE = String.format("SELECT %s, %s, %s, %s, %s, %s FROM %s WHERE %s > ? OR ( %s = ? AND %s > ? ) ORDER BY %s ASC, %s ASC, %s ASC LIMIT ?", COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL, COL_POST_COURSE_CODE, COL_POST_PRICE, COL_POST_CREATE_DATE, TBL_POST,
			COL_POST_CREATE_DATE, COL_POST_CREATE_DATE, COL_POST_OWNER_ID, COL_POST_CREATE_DATE, COL_POST_OWNER_ID, COL_POST_BOOK_TITLE);
	// SELECT OwnerID, BookTitle, BookPhotoURL, CourseCode, Price, CreateDate FROM POST WHERE CreateDate > ? or ( CreateDate = ? and OwnerID > ? ) ORDER BY CreateDate DESC, OwnerID DESC, BookTitle DESC LIMIT ?
	
	public static final String QRY_GET_COURSE_NEXT_N_POST_DISPLAY_INFO_ORDER_BY_DATE = String.format("SELECT %s, %s, %s, %s, %s, %s FROM %s WHERE ( %s > ? OR ( %s = ? AND %s > ? ) ) AND %s like ? ORDER BY %s ASC, %s ASC, %s ASC LIMIT ?", COL_POST_OWNER_ID, COL_POST_BOOK_TITLE, COL_POST_BOOK_PHOTO_URL, COL_POST_COURSE_CODE, COL_POST_PRICE, COL_POST_CREATE_DATE, TBL_POST,
			COL_POST_CREATE_DATE, COL_POST_CREATE_DATE, COL_POST_OWNER_ID, COL_POST_COURSE_CODE, COL_POST_CREATE_DATE, COL_POST_OWNER_ID, COL_POST_BOOK_TITLE);
	// SELECT OwnerID, BookTitle, BookPhotoURL, CourseCode, Price, CreateDate FROM POST WHERE ( CreateDate > ? or ( CreateDate = ? and OwnerID > ? ) ) and CourseCode LIKE ? ORDER BY CreateDate DESC, OwnerID DESC, BookTitle DESC LIMIT ?
}
