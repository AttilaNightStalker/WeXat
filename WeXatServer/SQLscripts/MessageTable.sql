use WeXat

create table texttable (
	userid varchar(28) ,
	textid int identity(0,1) unique,
	texttitle char(10) not null,
	text_ ntext not null,
	time_ datetime not null,
	primary key (textid)
)

-- alter table texttable 
-- add constraint FK_t2u foreign key (userid) references usertable(userid)

