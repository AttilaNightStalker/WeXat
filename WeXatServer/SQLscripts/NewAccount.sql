use WeXat
go

create proc insert_user (@user_name char(16),@passwd char(16))
as 
	if (exists(select * from usertable where username=@user_name))
	begin
		return -1
	end
	--user existed
	else 
	begin
		insert into usertable(username,pass_word) values (@user_name,@passwd)
		return 0
	end
	--success

