import { Injectable, Injector } from '@angular/core';
import { DialogService, DynamicDialogConfig as PrimeNGDynamicDialogConfig, DynamicDialogInjector, DynamicDialogRef as PrimeNGDynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';

// Monkey patch PrimeNGs DynamicDialogInjector, der die PrimeNG DynamicDialogRef und DynamicDialogConfig providet,
// sodass er die Instanzen dieser Klassen auch liefert, wenn unsere hauseigenen DynamicDialogRef und DynamicDialogConfig per DI angefordert werden.
const dynamicDialogInjectorSuperGet = DynamicDialogInjector.prototype.get;
DynamicDialogInjector.prototype.get = function (token: unknown, ...rest: unknown[]): any {
  if (token === DynamicDialogRef) {
    token = PrimeNGDynamicDialogRef;
  } else if (token === DynamicDialogConfig) {
    token = PrimeNGDynamicDialogConfig;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return dynamicDialogInjectorSuperGet.apply(this, [token, ...rest] as any);
};

/**
 * Typisierte Variante von PrimeNgs DynamicDialogConfig
 */
export class DynamicDialogConfig<T> extends PrimeNGDynamicDialogConfig {
  override data?: T | null = null;
}

/**
 * Typisierte Variante von PrimeNgs DynamicDialogRef
 */
export class DynamicDialogRef<T> extends PrimeNGDynamicDialogRef {
  declare onClose: Observable<T>;

  public override close(result?: T): void {
    super.close(result);
  }
}

/**
 * Als DynamicDialog verwendete Komponenten müssen im Constructor als erstes und zweites Argument ein DynamicDialogRef<> bzw. DynamicDialogConfig<> injecten lassen.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DynamicDialogComponent<I, O> = new (ref: DynamicDialogRef<O>, config: DynamicDialogConfig<I>, ...args: any[]) => unknown;

/**
 * Wrapper Service um PrimeNGs DialogService zur Anzeige von DynamicDialogs mit typisierten Inputs (über DynamicDialogConfig.data) und Outputs (über DynamicDialogRef.close)
 */
@Injectable({
  providedIn: 'root',
})
export class DynamicDialogService {
  constructor(
    private primeNgDialogService: DialogService,
    private injector: Injector,
  ) {}

  /**
   * Die Dialog Komponente muss im Constructor als erstes und zweites Argument ein DynamicDialogRef<> bzw. DynamicDialogConfig<> injecten lassen.
   * Die Dialog Komponente kann außerdem ein static Property `dialogConfig: DialogConfig` angeben, welches Defaultwerte für das Öffnen des Dialogs bereitstellt.
   */
  public open<I, O>(dialog: DynamicDialogComponent<I, O>, config: DynamicDialogConfig<I>): DynamicDialogRef<O> {
    return this.primeNgDialogService.open(dialog, { ...(dialog as any).dialogConfig, ...config });
  }
}
