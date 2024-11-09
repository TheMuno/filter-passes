const passesArr = ['the edge', 'hop on bus', 'circle line', 'esb', '911 museum', '1 world', 'tor', 'libby', 'intrepid', 'moma', 'guggenhiem', 'rise ny', 'amnh', 'radio city music hall tour', 'museum of broadway', 'central park zoo', 'catacombs by candleight', '3 neighborhood tour', 'wall st tour', 'artechouse', 'coney island wonder wheel', 'madam tussands', 'yankee stadium tour', 'madison sq garden tour'];
        const goCityArr = ['the edge', 'hop on bus', 'circle line', 'esb', '911 museum', '1 world', 'tor', 'libby', 'moma', 'guggenhiem', 'rise ny', 'amnh', 'radio city music hall tour', 'catacombs by candleight', '3 neighborhood tour', 'wall st tour', 'artechouse', 'madam tussands', 'yankee stadium tour', 'madison sq garden tour'];
        const sightseeingArr = ['the edge', 'hop on bus', 'circle line', 'esb', '911 museum', '1 world', 'tor', 'libby', 'rise ny', 'amnh', 'museum of broadway', 'central park zoo', 'artechouse', 'madam tussands', 'yankee stadium tour', 'madison sq garden tour'];
        const cityPassArr = ['circle line', 'esb', '911 museum', 'tor', 'guggenhiem', 'amnh'];

        const $goCity = document.querySelector('[data-pass="go-city"]');
        const $goCItyName = $goCity.querySelector('.name');
        const $gocityResultPasses = $goCity.querySelector('.result-passes');

        const $sightseeing = document.querySelector('[data-pass="sightseeing"]');
        const $sightseeingName = $sightseeing.querySelector('.name');
        const $sightseeingResultPasses = $sightseeing.querySelector('.result-passes');

        const $cityPass = document.querySelector('[data-pass="city-pass"]');
        const $cityPassName = $cityPass.querySelector('.name');
        const $cityPassResultPasses = $cityPass.querySelector('.result-passes');

        const $samplePass = $goCity.querySelector('.result-pass');

        const $passes = document.querySelector('.passes');
        $passes.addEventListener('click', e => {
            if (!e.target.closest('.pass')) return;
            if (!e.target.classList.contains('pass-check')) return; // make sure it only registers the checkbox click

            const $pass = e.target.closest('.pass');
            handlePassesClick($pass);
        });

        function handlePassesClick($pass) {
            const $checkbox = $pass.querySelector('input');
            const label = $pass.querySelector('label').textContent.trim().toLowerCase();

            $goCItyName.classList.remove('active');
            $sightseeingName.classList.remove('active');
            $cityPassName.classList.remove('active');

            $goCItyName.classList.remove('inactive');
            $sightseeingName.classList.remove('inactive');
            $cityPassName.classList.remove('inactive');

            $checkbox.checked ? addAllPassesToRelevantSections(label) : removePassFromSection(label);

            activateDeactivateAllPasses(); 
        }
 
        function addAllPassesToRelevantSections(label) {
            addPassToSection(goCityArr, label, $gocityResultPasses);
            addPassToSection(sightseeingArr, label, $sightseeingResultPasses);
            addPassToSection(cityPassArr, label, $cityPassResultPasses);
        }
 
        function addPassToSection(section, label, parent) {
            const $resultPassClone = $samplePass.cloneNode(true);
            $resultPassClone.querySelector('.text').textContent = label;
            $resultPassClone.classList.remove('hide');

            section.includes(label)? $resultPassClone.querySelector('.tick').classList.remove('hide') : $resultPassClone.querySelector('.ex').classList.remove('hide');

            parent.append($resultPassClone);
        }

        function removePassFromSection(label) {
            const $goCityPass = [...$gocityResultPasses.querySelectorAll('.result-pass')].filter(p => p.textContent.trim().toLocaleLowerCase().includes(label)); 
            const $sightseeingPass = [...$sightseeingResultPasses.querySelectorAll('.result-pass')].filter(p => p.textContent.trim().toLocaleLowerCase().includes(label)); 
            const $cityPass = [...$cityPassResultPasses.querySelectorAll('.result-pass')].filter(p => p.textContent.trim().toLocaleLowerCase().includes(label)); 
            
            if ($goCityPass.length) $goCityPass[0].remove();
            if ($sightseeingPass.length) $sightseeingPass[0].remove();
            if ($cityPass.length) $cityPass[0].remove();
        }

        function activateDeactivatePassTitles(passes, title) {
            const $allTicks = passes.querySelectorAll('.result-pass:not(.hide) .tick');
            const hiddenGoCityTicks = [...$allTicks].filter(t => t.classList.contains('hide'));
            if (hiddenGoCityTicks.length) {
                title.classList.add('inactive');
            }
            else {
                $allTicks.length ? title.classList.add('active') : title.classList.add('inactive');
            } 
        } 

        function activateDeactivateAllPasses() {
            activateDeactivatePassTitles($gocityResultPasses, $goCItyName);
            activateDeactivatePassTitles($sightseeingResultPasses, $sightseeingName);
            activateDeactivatePassTitles($cityPassResultPasses, $cityPassName);
        }