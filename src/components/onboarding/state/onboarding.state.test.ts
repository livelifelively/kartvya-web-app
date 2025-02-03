import { createActor, ActorRefFrom } from 'xstate';
import stepperMachine from './onboarding.state'; // Adjust the path as needed

// Derive the actor type from the machine
type StepperActor = ActorRefFrom<typeof stepperMachine>;

describe('stepperMachine', () => {
  let actor: StepperActor; // Explicitly type the actor variable

  beforeEach(() => {
    actor = createActor(stepperMachine);
    actor.start();
  });

  afterEach(() => {
    actor.stop();
  });

  it('should start at step1 with currentStep 1', () => {
    expect(actor.getSnapshot().value).toBe('step1');
    expect(actor.getSnapshot().context.currentStep).toBe(1);
  });

  it('should transition to step2 when E_NEXT is sent from step1, currentStep becomes 2', () => {
    actor.send({ type: 'E_NEXT' });
    expect(actor.getSnapshot().value).toBe('step2');
    expect(actor.getSnapshot().context.currentStep).toBe(2);
  });

  it('should transition to step3 when E_NEXT is sent from step2, currentStep becomes 3', () => {
    actor.send({ type: 'E_NEXT' }); // step1 -> step2
    actor.send({ type: 'E_NEXT' }); // step2 -> step3
    expect(actor.getSnapshot().value).toBe('step3');
    expect(actor.getSnapshot().context.currentStep).toBe(3);
  });

  it('should transition to step4 when E_NEXT is sent from step3, currentStep becomes 4', () => {
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    expect(actor.getSnapshot().value).toBe('step4');
    expect(actor.getSnapshot().context.currentStep).toBe(4);
  });

  it('should transition to step5 when E_NEXT is sent from step4, currentStep becomes 5', () => {
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    expect(actor.getSnapshot().value).toBe('step5');
    expect(actor.getSnapshot().context.currentStep).toBe(5);
  });

  it('should transition to done when E_NEXT is sent from step5, currentStep becomes 6', () => {
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    expect(actor.getSnapshot().value).toBe('done');
    expect(actor.getSnapshot().context.currentStep).toBe(6);
  });

  it('should transition to step1 when E_PREVIOUS is sent from step2, currentStep becomes 1', () => {
    actor.send({ type: 'E_NEXT' }); // step1 -> step2
    actor.send({ type: 'E_PREVIOUS' }); //step2 -> step1
    expect(actor.getSnapshot().value).toBe('step1');
    expect(actor.getSnapshot().context.currentStep).toBe(1);
  });

  it('should transition to step2 when E_PREVIOUS is sent from step3, currentStep becomes 2', () => {
    actor.send({ type: 'E_NEXT' }); // step1 -> step2
    actor.send({ type: 'E_NEXT' }); // step2 -> step3
    actor.send({ type: 'E_PREVIOUS' }); //step3 -> step2
    expect(actor.getSnapshot().value).toBe('step2');
    expect(actor.getSnapshot().context.currentStep).toBe(2);
  });

  it('should transition to step3 when E_PREVIOUS is sent from step4, currentStep becomes 3', () => {
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_PREVIOUS' });
    expect(actor.getSnapshot().value).toBe('step3');
    expect(actor.getSnapshot().context.currentStep).toBe(3);
  });

  it('should transition to step4 when E_PREVIOUS is sent from step5, currentStep becomes 4', () => {
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_PREVIOUS' });
    expect(actor.getSnapshot().value).toBe('step4');
    expect(actor.getSnapshot().context.currentStep).toBe(4);
  });

  it('should not transition state on E_NEXT when at done state', () => {
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' });
    actor.send({ type: 'E_NEXT' }); // to done state
    actor.send({ type: 'E_NEXT' }); // should not transition
    expect(actor.getSnapshot().value).toBe('done');
    expect(actor.getSnapshot().context.currentStep).toBe(6);
  });

  it('should not transition state on E_PREVIOUS when at step1 state', () => {
    actor.send({ type: 'E_PREVIOUS' });
    expect(actor.getSnapshot().value).toBe('step1');
    expect(actor.getSnapshot().context.currentStep).toBe(1);
  });
});
