use WeXat
go

create table usertable(
	username char(16) not null unique,
	pass_word char(16) not null,
)

alter table usertable add userid int identity(0,1) not null primary key