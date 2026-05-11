CREATE TABLE IF NOT EXISTS careers_configs (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    title varchar,
    subtitle text,
    description1 text,
    description2 text,
    description3 text,
    description4 text,
    image varchar,
    "formTitle" varchar,
    "formSubtitle" text,
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_applications (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar NOT NULL,
    message text,
    "resumeFile" varchar,
    created_at timestamp DEFAULT now()
);
