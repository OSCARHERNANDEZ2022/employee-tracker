USE employee_tracker;

INSERT INTO department (name)
VALUES ('manager'), ('dispatch'), ('customer service'), ('warehouse');

INSERT INTO roles (title, salary, dept_id)
VALUES ('manager',75000, 1), ('dispatcher', 65000, 2), ('customer service', 45000, 3), ('warehouse', 40000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Oscar', 'Hernandez', 1,1),
('David', 'Campos', 2,1),
('Emiliano', 'Zapata', 2, 1),
('Samantha', 'Davidson', 2,1),
('Mike', 'Nielson', 4, 1);
