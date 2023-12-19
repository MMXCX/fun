#!/bin/sh

include ./.env


dev:
	docker compose -f compose-dev.yaml up -d

prod:
	docker compose -f compose-prod.yaml up -d

test:
	docker compose -f compose-test.yaml up -d


stop:
	docker compose -f compose-dev.yaml down

reload:
	make stop
	make dev

generate:
	~/bin/openapitools/openapi-generator-cli generate --server-variables=api_host=${API_HOST},api_port=${API_PORT},api_prefix=${API_PREFIX} -i openapi.yaml -g typescript-axios -o ./frontend/src/api






#start:
#ifeq ($(MAKECMDGOALS), start dev)
#	docker compose -f compose-dev.yaml up -d
#endif
#ifeq ($(MAKECMDGOALS), start prod)
#	docker compose -f compose-prod.yaml up -d
#endif