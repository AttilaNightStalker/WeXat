use WeXat
go

create proc insertcomment (@tuserid varchar(28), @textid int, @replyid int, @cuserid varchar(28), @commenttext ntext)
as 
	insert into commenttable(textuserid, textid, replyid, commentuserid, commenttext) values
				(@tuserid, @textid, @replyid, @cuserid, @commenttext)
	return 0
	