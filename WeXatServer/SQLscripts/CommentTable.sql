use WeXat

create table commenttable (
	textuserid varchar(28),
	textid int ,
	commentuserid varchar(28),
	commentid int identity(0,1) unique ,
	replyid int, 
	commenttext ntext, 
	primary key(commentid)
)

-- alter table commenttable
-- add constraint FK_tu2u foreign key (textuserid) references usertable(userid)

-- alter table commenttable
-- add constraint FK_cu2u foreign key (commentuserid) references usertable(userid)

alter table commenttable 
add constraint FK_t2t foreign key (textid) references texttable(textid)

alter table commenttable 
add constraint FK_r2c foreign key (replyid) references commenttable(commentid)