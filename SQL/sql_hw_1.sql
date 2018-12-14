use sakila;

#1a
select 
	first_name, last_name
from actor;

#1b
ALTER TABLE `sakila`.`actor` 
ADD COLUMN `actor_name` VARCHAR(45) NULL after `last_update`;

update actor set actor_name = concat(first_name, ' ', last_name);

#2a
select
	actor_id, first_name, last_name
from actor
where
first_name = 'Joe';

#2b

select
	actor_id, first_name, last_name
from
	actor
where
	first_name like '%GEN%' or last_name like '%GEN%';

#2c

select
	actor_id, first_name, last_name
from
	actor
where
	last_name like '%LI%'
order by 
	last_name, first_name;

#2d

select
	country_id, country
from
	country
where
	country in ('Afghanistan', 'Bangladesh', 'China');

#3a

alter table actor
add column description blob not null after actor_name;

#3b

alter table actor
drop column description;

#4a

select
	last_name, count(*) as count
from
	actor
group by
	last_name
order by
	count desc;
    
#4b

select
	last_name, count(*) as count
from
	actor
group by
	last_name
having
	count >1
order by
	count desc;

#4c

update 
	actor
set
	first_name = 'HARPO'
where
	first_name = 'GROUCHO' and last_name = 'WILLIAMS';

#4d

update
	actor
set
	first_name = 'GROUCHO'
where
	first_name = 'HARPO';

#5a

show create table address;

#6a


select
	first_name, last_name, address
from
	staff
join
	address
on staff.address_id = address.address_id;

#6b

select
	first_name, last_name, sum(amount) as total_intake
from
	staff
join
	payment
on 
	staff.store_id = payment.staff_id
group by
	first_name;

#6c

select
	title, count(actor_id) as total_actors
from
	film_actor
inner join
	film
on
	film.film_id = film_actor.film_id
group by
	title;

#6d

select
	count(inventory_id) as num_copies
from 
	inventory
where
	film_id = (
		select
			film_id
		from
			film
		where
			title = 'HUNCHBACK IMPOSSIBLE');

#6e

select
	first_name, last_name, sum(amount) as customer_total
from
	customer
join
	payment
on
	customer.customer_id = payment.customer_id
group by
	first_name, last_name
order by
	last_name asc;
    
#7a

select
	title
from
	film
where
	language_id = 1 and title like 'K%' or title like 'Q%';

#7b

select
	actor_name
from
	actor
where
	actor_id in (
		select
			actor_id
		from
			film_actor
		where
			film_id = (
				select
					film_id
				from
					film
				where
					title = 'ALONE TRIP')
				);

#7c

select
	first_name, last_name, email
from
	customer
where
	address_id in (
		select
			address_id
		from
			address
		where
			city_id in (
				select
					city_id
				from
					city
				where
					country_id = (
						select
							country_id
						from
							country
						where
							country = 'Canada')
                            )
            );

#7d

select
	title
from
	film
where
	film_id in (
		select
			film_id
		from
			film_category
		where
			category_id = '8'
            );

#7e

alter table inventory
add column times_rented int after last_update;

update 
	inventory
set
	times_rented = (select
						count(inventory_id)
					from
						rental
					where
						rental.inventory_id = inventory.inventory_id);

select
	title, sum(times_rented) as times_rented
from
	film
join
	inventory
on
	film.film_id = inventory.film_id
group by
	title
order by
	times_rented desc;

#7f
# Am I taking crazy pills? There are only two stores, and one employee for each. This can't be the intent of this question,
# but I don't see nay reason to make it more difficult for myself.

select
	staff_id as store_id, sum(amount) as store_revenue
from
	payment
group by
	store_id;

#7g

alter table film
	add column total_income int after last_update;

update
	film
set
	total_income = (
		select
			sum(rental_rate*times_rented)
		from
			inventory
		where
			film.film_id = inventory.film_id);
            
#7h

select 
	category.name as genre, SUM(payment.amount) as gross_revenue 
from 
	category
join 
	film_category 
on 
	(category.category_id = film_category.category_id)
join 
	inventory 
on
	(film_category.film_id = inventory.film_id)
join 
	rental  
on
	(inventory.inventory_id = rental.inventory_id)
join 
	payment 
on 
	(rental.rental_id = payment.rental_id)
group by 
	category.name 
order by 
	gross_revenue  
limit 
	5;


#8a


create view 
	genre_revenue 
as
select 
	category.name as genre, SUM(payment.amount) as gross_revenue 
from 
	category
join 
	film_category 
on 
	(category.category_id = film_category.category_id)
join 
	inventory 
on 
	(film_category.film_id = inventory.film_id)
join 
	rental 
on 
	(inventory.inventory_id = rental.inventory_id)
join 
	payment 
on 
	(rental.rental_id = payment.rental_id)
group by 
	category.name 
order by
	gross_revenue
limit 
	5;


#8b

select * 
from 
	genre_revenue;


#8c


drop view genre_revenue;






