CREATE TABLE IF NOT EXISTS acou_acount
(
    id BIGSERIAL PRIMARY KEY,
    code VARCHAR(16) UNIQUE NOT NULL,
    name VARCHAR (32) NOT NULL
);


--disbursement vounchers--
CREATE TABLE IF NOT EXISTS acou_disb_vou
(
    id BIGSERIAL PRIMARY KEY,
    number BIGINT UNIQUE NOT NULL,
    place VARCHAR(32),
    date DATE,
    beneficiary VARCHAR(64),
    concept VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS acou_disb_vou_bank
(
    acou_disb_vou_id BIGSERIAL NOT NULL REFERENCES acou_disb_vou_id (id) ON UPDATE CASCADE ON DELETE CASCADE,
    bank VARCHAR(32),
    check VARCHAR(16),
    current_acount VARCHAR(16),
    value BIGINT NOT NULL
);

CREATE TABLE IF NOT EXISTS acou_disb_vou_code
(
    acou_acou_disb_vou_id BIGSERIAL NOT NULL REFERENCER acou_disb_vou_id (id) ON UPDATE CASCADE ON DELETE CASCADE,
    acou_acount_id BIGSERIAL NOT NULL REFERENCES acou_acount_id (id) ON UPDATE CASCADE ON DELETE CASCADE,
    partial BIGINT,
    debit BIGINT,
    credit BIGINT    
);


--acounting note--
CREATE TABLE IF NOT EXISTS acou_acou_note
(
    id BIGSERIAL PRIMARY KEY,
    number BIGINT UNIQUE NOT NULL,
    date DATE,
    concept VARCHAR(256)
);

CREATE TABLE IF NOT EXISTS acou_acou_note_code
(
    acou_acou_note_id BIGSERIAL NOT NULL REFERENCES acou_acou_note_id (id) ON UPDATE CASCADE ON DELETE CASCADE,
    acou_acount_id BIGSERIAL NOT NULL REFERENCER acou_acount_id (id) ON UPDATE CASCADE ON DELETE CASCADE,
    partial BIGINT,
    debit BIGINT,
    credit BIGINT
);
