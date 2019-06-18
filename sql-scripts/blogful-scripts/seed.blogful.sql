
insert into articles (title, date_published, content)
  values 
    ('Fish tricks', now() - '21 days'::INTERVAL, 'Im an article about fish'),
    ('Not Dogs', now() - '21 days'::INTERVAL, 'Dogs are the best pets.'),
    ('Bluffalo Wings', now() - '21 days'::INTERVAL, 'Let''s all eat wings'),
    ('SubstiTuna Salad', now() - '21 days'::INTERVAL, 'How about not'),
    ('Tofurkey', now() - '21 days'::INTERVAL, 'I''ll try anything twice'),
    ('Pretenderloins', now() - '9 days'::INTERVAL, 'STEAAAK'),
    ('Steak-believe', now() - '9 days'::INTERVAL, 'STEAK AGAIN'),
    ('Kale Seitan', now() - '9 days'::INTERVAL, 'It''s green and might be a vegetable'),
    ('NoBull Burger', now() - '9 days'::INTERVAL, 'I like Burgers'),
    ('Turnip the Beet', now() - '9 days'::INTERVAL, 'nope just nope'),
    ('Mascarphony', now() - '7 days'::INTERVAL, 'I dont know this one'),
    ('Burgatory',  now() - '7 days'::INTERVAL, 'Where all the bad burgers go'),
    ('Sleight of Ham', now() - '5 days'::INTERVAL, 'Pigs are tasty'),
    ('Antichovies', now() - '5 days'::INTERVAL, 'small fish on pizza'),
    ('Lettuce B. Frank', now() - '5 days'::INTERVAL, 'yes let us'),
    ('Pepperphony', now() - '5 days'::INTERVAL, 'Why am I typing all of this out.'),
    ('Shamburger', now() - '4 days'::INTERVAL, 'building this data feels like a waste of time'),
    ('Facon', now() - '4 days'::INTERVAL, 'Anly a few more to go'),
    ('Salami-get-this-straight',now() - '4 days'::INTERVAL, 'oh yeah this can be null'),
    ('Mi-steak',  now() - '3 days'::INTERVAL, null)
;