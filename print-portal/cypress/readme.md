# Test cases
- - -
## Negative Test

### Happy
- [x] DigiD
- [x] Token only
- [x] Token and verification

### Unhappy
- [x] None DigiD
- [x] None Token
- [x] Pending
- [x] Invalid token
- [x] Invalid verification
- [x] 429 on provider

### Side-flows
- [x] Back button
- [x] Did not receive verification popup
- [x] V2 Info popup (checks if info popup opens)
- [x] Something is wrong popup
- [x] Not yet tested popup
- [ ] Check content of info panel V2
- [ ] Check content of info panel V3
- [x] Check content print page 'european'
- [x] Check content print page 'both'

- - -

## Recovery

### Happy
- [x] DigiD

### Unhappy
- [x] None

### Side-flows
- [ ] Check content of info panel Recovery
- [ ] Check content of info panel Positive Test
- [x] Check content print page 'both'
- [x] Recovery Valid In Future

- - -

## Vaccination

### Happy
- [x] DigiD (full)

### Unhappy
- [x] None
- [x] Wrong BSN

### Side-flows
- [ ] Check content of info panel Vaccination
- [ ] Check content print page 'europe'
- [ ] Check content print page 'both'

- - -

## General
- [ ] Change language