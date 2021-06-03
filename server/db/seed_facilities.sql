INSERT INTO facilities (name, description) VALUES ('Smash Tennis Club', 'A private tennis club with well maintened indoor courts, hard courts, clay courts, and padel courts.');

INSERT INTO resources (facilities_id, name, description) VALUES (1, 'Court 1', 'Indoor Hard-court');
INSERT INTO resources (facilities_id, name, description) VALUES (1, 'Court 2', 'Indoor Hard-court');
INSERT INTO resources (facilities_id, name, description) VALUES (1, 'Court 3', 'Outdoor Hard-court');
INSERT INTO resources (facilities_id, name, description) VALUES (1, 'Court 4', 'Outdoor Clay-court');

INSERT INTO bookings (resources_id, start_time, end_time) VALUES (1, '2021-06-02T10:00:00.000Z', '2021-06-02T11:00:00.000Z');
INSERT INTO bookings (resources_id, start_time, end_time) VALUES (1, '2021-06-02T13:00:00.000Z', '2021-06-02T14:00:00.000Z');