drop table if exists prompts;
create table prompts(
  id integer primary key autoincrement,
  question text not null,
  "image" text not null,
  quote text not null
);

drop table if exists replies;
create table replies(
  id integer primary key autoincrement,
  question_id integer not null,
  texted_from integer not null,
  reply text not null
);