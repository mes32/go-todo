DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS task_group;

CREATE TABLE task_group (
    id SERIAL PRIMARY KEY
    , group_name VARCHAR(200) NOT NULL
);

CREATE TABLE task (
    id SERIAL PRIMARY KEY
    , group_id INT NOT NULL REFERENCES task_group(id)
    , task_description VARCHAR(200) NOT NULL
    , complete BOOLEAN NOT NULL DEFAULT FALSE
);