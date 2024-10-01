DROP TABLE IF EXISTS public."refresh_tokens";

CREATE TABLE public."refresh_tokens" 
(
	id SERIAL PRIMARY KEY,
	user_id INT NOT NULL,
	token TEXT NOT NULL,
	expires TIMESTAMP NOT NULL,
	user_agent TEXT  NOT NULL,

	FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);