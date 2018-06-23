use WeXat
go

create proc request_text 
as 
	declare @cur_date datetime, @datebefore datetime
	select @cur_date = GETDATE()
	select @datebefore = DATEADD(dd,-1,GETDATE())
	select *
	from texttable,commenttable
	where time_ between @datebefore and @cur_date and
		  texttable.textid = commenttable.textid
	order by texttable.textid desc ,commentid asc

