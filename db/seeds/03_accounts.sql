INSERT INTO accounts (category_id, organization_id, website, username, password)
VALUES
  -- Social Media
  (1, 1, 'www.facebook.com', 'user1', 'password1'),
  (1, 1, 'www.instagram.com', 'user2', 'password2'),
  (1, 1, 'www.twitter.com', 'user3', 'password3'),
  (1, 1, 'www.linkedin.com', 'user4', 'password4'),
  (1, 1, 'www.pinterest.com', 'user5', 'password5'),
  
  -- E-commerce
  (2, 1, 'www.amazon.com', 'user6', 'password6'),
  (2, 1, 'www.ebay.com', 'user7', 'password7'),
  (2, 1, 'www.etsy.com', 'user8', 'password8'),
  
  -- Email
  (3, 1, 'www.gmail.com', 'user9', 'password9'),
  (3, 1, 'www.yahoo.com', 'user10', 'password10'),
  (3, 1, 'www.outlook.com', 'user11', 'password11'),
  
  -- Banking
  (4, 1, 'www.bmo.com', 'user12', 'password12'),
  (4, 1, 'www.rbcroyalbank.com', 'user13', 'password13'),
  (4, 1, 'www.desjardins.com', 'user14', 'password14'),
  
  -- Entertainment
  (5, 1, 'www.netflix.com', 'user15', 'password15'),
  (5, 1, 'www.youtube.com', 'user16', 'password16'),
  (5, 1, 'www.spotify.com', 'user17', 'password17');


-- Path: db/seeds/03_accounts.sql