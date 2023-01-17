CREATE TABLE "user" (
	"id" serial primary key,
	"username" varchar(20) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"website" varchar(255),
	"linkedin" varchar(255),
	"profilepic" varchar(255) DEFAULT "./images/profilepics/default.svg"; 
	"defaultpic" int,
	"email" varchar(255),
	"admin" BOOLEAN NOT NULL DEFAULT 'false'
);



CREATE TABLE "posts" (
	"id" serial primary key,
	"path" varchar(255),
	"text" varchar(255),
	"loves" int NOT NULL DEFAULT 0,
	"flagged" BOOLEAN NOT NULL DEFAULT 'false',
	"post_type" varchar(255) NOT NULL,
	"date" TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE "users_posts" (
	"id" serial primary key,
	"user_id" int NOT NULL references "user",
	"posts_id" int NOT NULL references "posts",
	"reply_to" int references "posts"
	"action_type" varchar(255) NOT NULL
);



CREATE TABLE "awards" (
	"id" serial primary key,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"path" varchar(255) NOT NULL
	"points_required" INT NOT NULL DEFAULT 0
);



CREATE TABLE "users_awards" (
	"id" serial primary key,
	"user_id" int NOT NULL references "user",
	"awards_id" int NOT NULL references "awards"
);

INSERT INTO "awards" ("id","name","description","path","points_required")
VALUES (9,"Evil Purple Glue Stick","It NEVER dries clear! MUAHAHAHA!","./images/awards/award9.png",3),
(7,"Rainbow Clay","It magically turns to brown clay when you play with it!","./images/awards/award7.png",2),
(8,"Sushi Roll Eraser","DON’T EAT IT! It’s an eraser!","./images/awards/award8.png",2),
(4,"“Smart” Phone","Sure, it’s a bit dated now, but it has a keyboard and everything!","./images/awards/award4.png",1),
(5,"Knock-off Silly Bands","Mom said the real Silly Bands were too expensive…","./images/awards/award5.png",1),
(6,"“Get out of Vim free” Card"," “Colon Q! COLON W Q! AAAH! SOMEONE HELP ME PLEASE!”","./images/awards/award6.png",1),
(12,"Deodorant","You should buy it! Trust me.","./images/awards/award12.png",15),
(11,"Minnesota HOT!!! Spice Blend","It’s salt and pepper.","./images/awards/award11.png",10),
(1,"Fictional School Acceptance Letter","Hooray! …oh wait, you’re an adult with a job.","./images/awards/award1.png",0),
(2,"Renaissance Fair Turkey Leg","Totally worth waiting 2 hours in traffic for.","./images/awards/award2.png",0),
(3,"Overpriced Bath Bomb","For only $10 you can leave permanent stains in your bathtub!","./images/awards/award3.png",0),
(10,"Jelly Beans on Toast","An American twist on a British classic.","./images/awards/award10.png",5);

INSERT INTO "posts" ("id","path","text","loves","flagged","post_type","date")
VALUES (2,,"Exploring a crystal cave and finding something unexpected...",0,FALSE,"post","2023-01-04 00:00:00"),
(1,"./images/uploads/comic-example.png",,0,FALSE,"post","2023-01-04 00:00:00"),
(124,,"""What kind of birthday cake is this?! Ewwww!""",0,FALSE,"post","2023-01-17 01:23:06.966861"),
(24,,"Your pet is secretly a superhero... what is their superpower? Costume?",1,FALSE,"post","2023-01-06 09:47:48.556046"),
(57,"./images/uploads/comic-example-2.png",,2,FALSE,"post","2023-01-09 12:25:09.482188"),
(127,"./images/uploads/1673941944148giratina.png",,1,FALSE,"post","2023-01-17 01:52:24.199563"),
(129,,"""I don't think I can slay this dragon. It's too cute!""",0,FALSE,"post","2023-01-17 01:59:14.166555"),
(132,,"Mmmm giant cheese... I must... eat it!",0,FALSE,"reply","2023-01-17 08:48:03.170103"),
(12,,"There's a snowstorm outside and you're trapped indoors with your worst enemy!",0,FALSE,"post","2023-01-05 01:05:59.009371"),
(112,,"""My gaming PC is better than yours!""",0,FALSE,"post","2023-01-12 00:12:17.226878"),
(138,"./images/uploads/1673973392391cave.png",,0,FALSE,"post","2023-01-17 10:36:32.469442"),
(139,"./images/uploads/1673973429120fishcake.png",,0,FALSE,"reply","2023-01-17 10:37:09.123412"),
(140,,"Glasses: Want a cookie? Me, in incognito mode: No thanks!",0,FALSE,"reply","2023-01-17 10:37:53.676233"),
(131,,"Green hoodie: ""Are those oatmeal raisin cookies?"" Purple shirt: ""What am I, some kind of monster?""",1,FALSE,"reply","2023-01-17 02:01:53.88488"),
(128,"./images/uploads/1673941993284examplecomic2.png",,2,FALSE,"post","2023-01-17 01:53:13.286957"),
(135,,"Dude this is epic",0,TRUE,"reply","2023-01-17 08:53:14.303404");

INSERT INTO "user" ("id","username","password","website","linkedin","email","admin","profilepic","defaultpic")
VALUES (3,"awesomecatlover","$2a$10$zmjE7tyyGykI.TLCYPSOF.LErX49OnhqolQs5qNIHtH8GQJP/aAlW","https://crazycatlady.org","https://linkedin.com/crazycatlady","crazycatlady@traceytreat.com",FALSE,"./images/uploads/1673973602369avatar4icon.png",8785758),
(4,"dogsarethebest","$2a$10$mWbWtX6iCtVmzTcYkMZgS.CDdkKb.fkTifyMWUaFjTIZDp6m8zKD.",,,"dogs@traceytreat.com",FALSE,"./images/profilepics/default.svg",3212465),
(6,"pikachu2023","$2a$10$QJcUEdNHWNuvubGBLhjO0.QQhsqxfrSQAVqsL8fzDuXkrWy/TWZvK",,,"pikachu@traceytreat.com",FALSE,"./images/profilepics/default.svg",3626620),
(5,"gelatinouscube","$2a$10$lE.tpvRz6KVSf8Z5Sc5px.bNAtv3FKZZ3HVinnT7992G8eZOKfD8S",,,"cube@traceytreat.com",FALSE,"./images/profilepics/default.svg",13116857),
(7,"eevee2020","$2a$10$gpi1AERmjk1JUMrqg3xXXuS2zRUMR30BjWF/QS3Mp8dWQyn8vryZu",,,"eevee@traceytreat.com",FALSE,"./images/profilepics/default.svg",9267077),
(9,"hellotesting","$2a$10$sOvj.wC/nr.4lIAgJ7OUd.g1Kmlsmhu5uKkrGX9yGDSXgoLYlSDXm",,,"hello@traceytreat.com",FALSE,"./images/profilepics/default.svg",9267077),
(10,"wolfdog20","$2a$10$vziAWWUMXRjC3ry4Z9q/sOWE4d6bvqN8wkqEPQ34pwg5JN2IPmxvS",,,"wd@traceytreat.com",FALSE,"./images/profilepics/default.svg",14782659),
(11,"testingagain","$2a$10$5T5lfs6vDsJuVlDwwooPdeFyjYthqz/oPkyFHq1qX2l.iSU5x8gWW",,,"test@traceytreat.com",FALSE,"./images/profilepics/default.svg",1055662),
(12,"testingagain2","$2a$10$aonkgiV.OivIxQRPJf2aJ.petosDlhmJSswMLHf7x84VZ5fIRlcHi",,,"test@traceytreat.com",FALSE,"./images/profilepics/default.svg",11034007),
(13,"testjanuary3","$2a$10$gEU6mXBS5Cw65u5VYRlElerGjptRg5LY46PpL87/9bbLm8HPrSPvG",,,"test3@traceytreat.com",FALSE,"./images/profilepics/default.svg",7932315),
(14,"hi","$2a$10$y2LUGqJ7oAwRvQravH1gBO96SXie9GCSbsPBvFxkSqeUDOTpoF60y",,,"hi2@hello.com",FALSE,"./images/profilepics/default.svg",1818667),
(1,"admintracey","$2a$10$wdIgqukGA.PP4W1Xiyxp5.qjlshIe.XRVbdpuZTiWl7g4L5POUYA6","https://github.com/traceytreat","https://linkedin.com/in/traceystreat","admintracey@traceytreat.com",TRUE,"./images/uploads/1673940243906ScreenShot2022-10-25at9.00.19PM.png",8383891),
(2,"adminalex","$2a$10$dHqqtaVN79ZyPRkrondCIeDLx1.DZ/IEWCjZMWjImEAFTfSQIu1jq",,,"adminalex@traceytreat.com",TRUE,"./images/uploads/1673942145020IMG_3533.JPG",14006741);

INSERT INTO "users_awards" ("id","user_id","awards_id")
VALUES (5,1,7),
(8,1,8),
(9,3,6),
(10,2,9),
(11,3,4);

INSERT INTO "users_posts" ("id","user_id","posts_id","action_type","reply_to")
VALUES (1,3,1,"post",),
(2,4,2,"post",),
(169,1,124,"post",),
(66,4,57,"post",),
(175,1,57,"love",),
(11,3,12,"post",),
(178,4,127,"post",),
(179,10,128,"post",),
(180,2,127,"love",),
(181,2,129,"post",),
(183,2,131,"post",128),
(184,2,132,"post",1),
(188,2,128,"love",),
(189,7,135,"post",127),
(140,3,101,"post",),
(22,1,24,"post",);