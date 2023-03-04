
export PATH=$PATH:/opt/homebrew/bin/
PATH=$PATH:/opt/homebrew/bin/

EXAMEN_TYPE=$1
date

[ -z "${EXAMEN_TYPE}" ] && echo "provide examen type " && exit 1

#SLACK_HOOK=https://hooks.slack.com/services/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
SLACK_HOOK=https://hooks.slack.com/services/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
DATE=$(date +"%Y-%m-%d")
response=$(curl -s -XPOST https://risweb.groupe-du-mail.com/XaPortaildiffusionmobile/Application/api/PriseRvExternal/SearchCreneauxReservation \
  -H 'Content-Type: application/json' \
  -d '{"codeSite":"","typeExamen":"IR","examen": {"code":"'${EXAMEN_TYPE}'"},"periode":"00","date":"'${DATE}'T00:00:00","nbJoursRecherche":17,"periode":"10","codeRadiologue":""}')
dates_with_slots=$(echo $response | jq ".data.creneaux[].dates[].date" | sort | uniq | cut -d T -f 1 | tr '"' ' ' )
#echo $response | jq ".data.creneaux[] | {libelleSite, dates}"
echo $dates_with_slots

message=$(echo $response | jq '.Message' | tr '"' ' ')
echo message $message
if [ ! "$message" == "null" ]; then
  echo '{"text":"failed call: '$message'!"}'
#  echo $(echo $response | jq)
  curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"failed call: '"$message"'!"}' ${SLACK_HOOK}
  exit 1
fi
errors=$(echo $response | jq '.validationErrors')
echo my $errors
if [ ! $(echo $response | jq '.validationErrors | length') -eq 0 ]; then
  curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"validationErrors: '"$errors"'!"}' ${SLACK_HOOK}
  exit 1
fi

NB_SLOTS=$(echo  $response | jq '.data.creneaux | length' )

echo "creneaux disponibles le" : $dates_with_slots
if [ "$NB_SLOTS" -gt "0" ]; then
  curl -X POST -H 'Content-type: application/json' \
  --data '{"text":"creneaux disponibles le(s): '"${dates_with_slots}"'!"}' ${SLACK_HOOK}
fi

