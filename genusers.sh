#!/bin/sh

(for i in gethrto dobkaera almarcthesun mass_l_memes livemagictv; do 
	curl -s -HClient-Id:bk6et0zvlywoksrjy0piia6udb003b "https://api.twitch.tv/helix/users?login=$i" | jq -rc .data[0].id - 
done) | paste -sd "," -
