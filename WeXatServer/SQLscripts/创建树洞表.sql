use TreeHoles

create table texttable (
	userid int ,
	textid int identity(1,1) unique,
	texttitle char(10) not null,
	text_ char(500) not null,
	time_ datetime not null,
	primary key (userid,textid)
)

alter table texttable 
add constraint FK_t2u foreign key (userid) references usertable(userid)

