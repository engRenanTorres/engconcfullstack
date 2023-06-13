#!/bin/bash

yarn format
git add .

echo "Qual a mensagem do commit?"
read commitmsg

git commit -m "$commitmsg"

