create table users(
user_id serial primary key,
name varchar (20),
contact bigint,
username varchar (20),
password varchar (200),
email varchar (50),
bio varchar (100)
);
alter table users add column role varchar(20) NOT NULL;

create table farmers(
farmer_id serial primary key,
rating double precision
);

create table customer(
customer_id serial primary key,
address varchar (100)
);

alter table customer add column user_id int;

alter table customer add FOREIGN KEY(user_id) references users(user_id)

alter table farmers add column user_id int;
alter table farmers add FOREIGN KEY(user_id) references users(user_id)

CREATE TABLE product (
  product_id SERIAL PRIMARY KEY,
  farmer_id INTEGER,
  name VARCHAR(255) ,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL,
  is_organic BOOLEAN,
  FOREIGN KEY (farmer_id) REFERENCES farmers(farmer_id)
);

CREATE TABLE Review (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  rating DECIMAL(2, 1) NOT NULL,
  comment TEXT,
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES Product(product_id),
  FOREIGN KEY (customer_id) REFERENCES Customer(customer_id)
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(255) NOT NULL,
  FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE order_Item (
  order_item_id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);


