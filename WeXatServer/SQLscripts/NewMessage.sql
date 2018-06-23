use WeXat
go

create proc insert_text (@userid varchar(28), @text ntext)
as 
	insert into texttable(userid, texttitle, text_, time_) values (@userid, 'default', @text, GETDATE())
	return 0;
