use WeXat
go

create proc checkin (@user_name char(16),@passwd char(16))
as 
	if (exists(select * from usertable where username=@user_name and pass_word=@passwd))
	begin
		return 0
	end
	--success
	else if (not exists (select * from usertable where username = @user_name))
	begin
		return -1
	end
	-- user not exist
	else
	begin 
		return 1
	end
	--wrong password

