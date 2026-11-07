-- Management auf /ueber-uns: Namen und Fotos von matrixpos.de/uber-uns übernommen (Robert 07.11.).
-- Quelle Namen und Rollen: https://matrixpos.de/uber-uns, Geschäftsführer laut Impressum: David Shakory.
-- Fotos nur für Carsten Schoppe und Thomas Hogefeld vorhanden (500 px, liegen in public/lp/team),
-- die übrigen zeigen Initialen, bis Fotos da sind. Kurzbiografien gibt es auf der alten Seite nicht (bio bleibt leer).
-- Im Supabase SQL Editor ausführen. Erwartet die Rollen aus 20261106000000_cms_partner_team.sql.

update public.team_members set name = 'David Shakory' where role = 'Geschäftsführung';
update public.team_members set name = 'Carsten Schoppe', photo_url = '/lp/team/carsten-schoppe.jpg' where role = 'Kaufmännische Leitung';
update public.team_members set name = 'Alexander Locmelis' where role = 'Leitung Professional Services';
update public.team_members set name = 'Jens Gerrelts' where role = 'Leitung Payment';
update public.team_members set name = 'Marvin Günther' where role = 'Leitung Support';
update public.team_members set name = 'Sascha Trenz' where role = 'Leitung Forschung und Entwicklung';
update public.team_members set name = 'Thomas Hogefeld', photo_url = '/lp/team/thomas-hogefeld.jpg' where role = 'Leitung Personalmanagement-Systeme';

select role, name, photo_url from public.team_members order by sort;
