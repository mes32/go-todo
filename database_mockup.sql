INSERT INTO task_group
    (group_name)
    VALUES
    ('Groceries'),
    ('Programming'),
    ('Exercise');

INSERT INTO task
    (group_id, task_description, complete)
    VALUES
    (1, 'Carrots', TRUE),
    (1, 'Celery', TRUE),
    (1, 'Red onions', TRUE),
    (1, 'Spinach for salad', TRUE),
    (1, 'Milk', FALSE),
    (1, 'One dozen eggs', FALSE),
    (1, 'Oatmeal', FALSE),
    (2, 'Vue.js tutorial', TRUE),
    (2, 'Golang to-do app', FALSE),
    (3, 'Calisthenics', FALSE),
    (3, 'Run 5.5 miles', FALSE);