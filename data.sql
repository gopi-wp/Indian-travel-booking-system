USE travel_booking;

-- Insert sample destinations
INSERT INTO destinations (name, description, image_url, base_price) VALUES
('Taj Mahal, Agra', 'One of the seven wonders of the world, this ivory-white marble mausoleum is a symbol of love.', 'images/taj-mahal.jpg', 5000.00),
('Varanasi Ghats', 'The spiritual capital of India, known for its sacred ghats along the Ganges River.', 'images/varanasi.jpg', 4500.00),
('Kerala Backwaters', 'A network of interconnected canals, rivers, lakes and inlets, forming a breathtaking waterways system.', 'images/kerala.jpg', 7200.00),
('Goa Beaches', 'Famous for its pristine beaches, Portuguese heritage, and vibrant nightlife.', 'images/goa.jpg', 6800.00),
('Jaipur, Rajasthan', 'The Pink City known for its stunning palaces, forts, and vibrant culture.', 'images/jaipur.jpg', 5500.00),
('Ladakh', 'A high-altitude desert with dramatic landscapes, Buddhist monasteries, and adventurous roads.', 'images/ladakh.jpg', 8900.00),
('Darjeeling, West Bengal', 'Famous for its tea industry, stunning views of Kangchenjunga, and the Darjeeling Himalayan Railway.', 'images/darjeeling.jpg', 6200.00),
('Mysore Palace', 'The official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.', 'images/mysore.jpg', 4800.00),
('Amritsar Golden Temple', 'The holiest Gurdwara and spiritual center of Sikhism.', 'images/amritsar.jpg', 4300.00),
('Hampi, Karnataka', 'A UNESCO World Heritage Site with ancient ruins and temples from the Vijayanagara Empire.', 'images/hampi.jpg', 5100.00),
('Ajanta and Ellora Caves', 'Ancient rock-cut cave monuments featuring Buddhist, Hindu and Jain artwork.', 'images/ajanta-ellora.jpg', 5700.00),
('Rishikesh and Haridwar', 'Twin holy cities on the Ganges known for spirituality, yoga, and the Kumbh Mela.', 'images/rishikesh.jpg', 4900.00);

-- Insert sample bookings
INSERT INTO bookings (destination_id, package_type, check_in, check_out, adults, children, name, email, phone, message, total_cost, discount, status) VALUES
(1, 'premium', '2023-12-15', '2023-12-20', 2, 1, 'Rajesh Kumar', 'rajesh@example.com', '9876543210', 'We would like a room with a view of Taj Mahal', 45000.00, 10.00, 'confirmed'),
(3, 'standard', '2023-11-10', '2023-11-15', 4, 0, 'Priya Singh', 'priya@example.com', '8765432109', 'Interested in houseboat stay', 86400.00, 0.00, 'pending'),
(5, 'basic', '2023-12-01', '2023-12-04', 2, 0, 'Amit Patel', 'amit@example.com', '7654321098', 'Looking for heritage walk', 16500.00, 0.00, 'confirmed');

-- Insert admin user (password is hashed with bcrypt - "admin123")
INSERT INTO users (username, password, email) VALUES
('admin', '$2b$10$K7LdK.9pVn8p2p3p4p5p6e7f8g9h0i1j2k3l4m5n6o7p8q9r0s1t2u3v4w5x6y', 'admin@travelbooking.com');
