# Prix d'un intervenant à domicile

Combien ça vous coûte d'employer un intervenant à domicile ramené dans le référentiel de votre boite ?

Le résultat vous donne les résultats des calculs intermédiaires et le cout final à payer par votre entreprise.

## Installation

Facile :

`npm install`

## Paramètres du script

- le prix à payer net
- (optionnel) un booléen indiquant si le prix indiqué est en fait un prix charges comprises d'auto/microentrepreneur (defaut : faux)

`node index.js <prix> [<ae>]`

### note

Le script ne gère pas encore de paramètres optionnels pour le régler. Par contre il a des constantes que vous pouvez facilement modifier en tête de fichier.

Le paramétrage par défaut prend en compte :

- un TMI à 30%
- des charges sociales de 45% en dehors (TNS)

Les règles de calcul et taux utilisés sont ceux applicables à l'année 2016 (charges sociales des différents statuts, réductions fiscales, …).

## Interprétation des résultats

- `black` correspond au black, ou bien si vous réglez sans aucun avantage une rémunération nette (par exemple pour un intervenant intermittent du spectacle)
- `AE` correspond à un règlement pour un auto/microentrepreneur. Celui-ci paye lui-même ses charges.
- `AE-SAP` correspond à un règlement pour un auto/microentrepreneur ayant un agrément « service à la personne ». Celui-ci paye lui-même ses charges.
- `CESU` correspond à un règlement avec un CESU déclaratif (ou bancaire).
- `CESU-pre` correspond à un règlement avec un CESU préfinancé par une entreprise.
- `CESU-pre-post` correspond à un règlement avec un CESU préfinancé par une entreprise, mais après avoir passé le plafond d'abattement de charges sociales de 1 830 € / an.

Les colonnes sont :
- `csInt` : charges sociales de l'intervenant
- `intTotal` : prix charges de l'intervenant comprises
- `rIR` : la réduction d'IR
- `remu` : ce qu'il faut se rémunérer
- `IR` : l'IR à payer
- `cs` : les charges sociales à régler sur votre rémunération
- `rIS` : la réduction d'IS
- `cout` : le cout final pour votre entreprise (0 = le fait de ne pas prendre d'intervenant du tout)

## Exemples

L'intervenant me demande 30 € nets :
```
$ node index.js 30
Prix net : 30
type           csInt  intTotal  rIR    remu   IR     cs     rIS    cout
-------------  -----  --------  -----  -----  -----  -----  -----  -----
black          0      30        0      42.86  12.86  19.29  17.4   44.74
AE             9.11   39.11     0      55.88  16.76  25.14  22.69  58.33
AE-SAP         9.11   39.11     19.56  27.94  8.38   12.57  11.34  29.17
CESU           22.9   52.9      26.45  37.79  11.34  17     15.34  39.45
CESU-pre       22.9   52.9      11.45  16.36  4.91   7.36   22.54  31.18
CESU-pre-post  22.9   52.9      26.45  37.79  11.34  17     22.84  31.95
```

L'intervenant est à la base en AE et facture habituellement 30 € :
```
$ node index.js 30 true
Prix net : 23.01
type           csInt  intTotal  rIR    remu   IR     cs     rIS    cout
-------------  -----  --------  -----  -----  -----  -----  -----  -----
black          0      23.01     0      32.87  9.86   14.79  13.35  34.32
AE             6.99   30        0      42.86  12.86  19.29  17.4   44.74
AE-SAP         6.99   30        15     21.43  6.43   9.64   8.7    22.37
CESU           17.1   40.11     20.05  28.65  8.59   12.89  11.63  29.91
CESU-pre       17.1   40.11     8.55   12.21  3.66   5.5    17.15  23.57
CESU-pre-post  17.1   40.11     20.05  28.65  8.59   12.89  17.38  24.16
```

## Garanties

Ce script est fourni à titre informationnel et tel quel.
Aucune garantie d'exactitude n'est donnée. Vous consentez à une utilisation à vos risques et périls ;)

## Bugs

Si vous voulez améliorer ce script ou corriger des bugs, je suis ouvert aux PR !
