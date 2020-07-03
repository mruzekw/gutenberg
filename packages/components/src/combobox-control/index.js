/**
 * External dependencies
 */
import { useCombobox } from 'downshift';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { Button, Dashicon } from '../';

const itemToString = ( item ) => item && item.name;
export default function ComboboxControl( {
	className,
	hideLabelFromVision,
	label,
	isLoading,
	options: items,
	onInputValueChange: onInputValueChange,
	onChange: onSelectedItemChange,
	value: _selectedItem,
	initialInputValue,
	initialHighlightedIndex,
} ) {
	const {
		getLabelProps,
		getToggleButtonProps,
		getComboboxProps,
		getInputProps,
		getMenuProps,
		getItemProps,
		isOpen,
		highlightedIndex,
		selectedItem,
	} = useCombobox( {
		initialSelectedItem: items[ initialHighlightedIndex || 0 ],
		initialInputValue,
		items,
		itemToString,
		onInputValueChange,
		onSelectedItemChange,
		selectedItem: _selectedItem,
		initialHighlightedIndex,
	} );
	const menuProps = getMenuProps( {
		className: classnames( 'components-combobox-control__menu', {
			'is-loading': isLoading,
		} ),
	} );
	// We need this here, because the null active descendant is not
	// fully ARIA compliant.
	if (
		menuProps[ 'aria-activedescendant' ] &&
		menuProps[ 'aria-activedescendant' ].slice(
			0,
			'downshift-null'.length
		) === 'downshift-null'
	) {
		delete menuProps[ 'aria-activedescendant' ];
	}
	return (
		<div
			className={ classnames( 'components-combobox-control', className ) }
		>
			{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */ }
			<label
				{ ...getLabelProps( {
					className: classnames(
						'components-combobox-control__label',
						{
							'screen-reader-text': hideLabelFromVision,
						}
					),
				} ) }
			>
				{ label }
			</label>
			<div
				{ ...getComboboxProps( {
					className: 'components-combobox-control__button',
				} ) }
			>
				<input
					{ ...getInputProps( {
						className: 'components-combobox-control__button-input',
					} ) }
				/>
				<Button
					{ ...getToggleButtonProps( {
						// This is needed because some speech recognition software don't support `aria-labelledby`.
						'aria-label': label,
						'aria-labelledby': undefined,
						className: 'components-combobox-control__button-button',
					} ) }
				>
					<Dashicon
						icon="arrow-down-alt2"
						className="components-combobox-control__button-icon"
					/>
				</Button>
			</div>
			<ul { ...menuProps }>
				{ isOpen &&
					items.map( ( item, index ) => (
						// eslint-disable-next-line react/jsx-key
						<li
							{ ...getItemProps( {
								item,
								index,
								key: item.key,
								className: classnames(
									'components-combobox-control__item',
									{
										'is-highlighted':
											index === highlightedIndex,
									}
								),
								style: item.style,
							} ) }
						>
							{ item === selectedItem && (
								<Dashicon
									icon="saved"
									className="components-combobox-control__item-icon"
								/>
							) }
							{ item.name }
						</li>
					) ) }
			</ul>
		</div>
	);
}
