module.exports = {
	CUSTOMER: "CUSTOMER",
	STAFF: "STAFF",
	ADMIN: "ADMIN",
	URL: {
		"CUSTOMER": ["/api/auth", "/api/user/create"],
		"STAFF": ["/api/auth"],
		"ADMIN": ["/api/auth", "/api/staff/create"]
	}
};