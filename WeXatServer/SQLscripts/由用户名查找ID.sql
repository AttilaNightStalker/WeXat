use WeXat
go

create proc username2id (@user_name char(16))
as 
	declare @userid int
	select @userid = (select userid from usertable where @user_name = username)
	return @userid

