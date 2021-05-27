const html = `
<ul class="holder-identity-characters">
    <li>
        <div class="HolderIdentityCharacters__label">
            1
        </div>
        <div class="HolderIdentityCharacters__value">
            %{firstNameInitial}
        </div>
    </li>
    <li>
        <div class="HolderIdentityCharacters__label">
            2
        </div>
        <div class="HolderIdentityCharacters__value">
            %{lastNameInitial}
        </div>
    </li>
    <li>
        <div class="HolderIdentityCharacters__label">
            3
        </div>
        <div class="HolderIdentityCharacters__value">
            %{birthDayStyled}
        </div>
    </li>
    <li>
        <div class="HolderIdentityCharacters__label">
            4
        </div>
        <div class="HolderIdentityCharacters__value">
            %{birthMonthStyled}
        </div>
    </li>
</ul>`;

export default html;
