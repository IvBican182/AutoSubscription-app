

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    role_name VARCHAR(255)
);

CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    group_name VARCHAR(255) NOT NULL UNIQUE,
    group_age INT
);


CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    subscription_name VARCHAR(255) NOT NULL UNIQUE,
    price DECIMAL(10, 2) NOT NULL
    
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    user_email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255),
    user_age INT,
    role_id INT,
    group_id INT NOT NULL,

    CONSTRAINT fk_group
      FOREIGN KEY (group_id) REFERENCES groups (id),

    CONSTRAINT fk_role
      FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE userSubscription (
    user_id INT NOT NULL,
    subscription_id INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,

    CONSTRAINT fk_user
      FOREIGN KEY (user_id) REFERENCES users (id),
    
    CONSTRAINT fk_subscription
      FOREIGN KEY (subscription_id) REFERENCES subscriptions (id)
);

